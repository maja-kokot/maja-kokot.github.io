# build_notes.py (Version 3 - Fixes FileNotFoundError)

import os
import re
import subprocess
import json
import shutil

# --- CONFIGURATION ---
SOURCE_DIR = "notes_source"
HUGO_CONTENT_DIR = "content/notes"
PDF_OUTPUT_DIR = "static/notes_pdf"
SVG_OUTPUT_DIR = "static/img/notes"
SEARCH_INDEX_FILE = "static/js/search_index.json" # The file to be created

# --- REGEX DEFINITIONS ---
DEFINITION_REGEX = re.compile(r"\\searchabledefinition{(.*?)}{((?:[^{}]|{(?:[^{}]|{[^{}]*})*})*)}", re.DOTALL)
TIKZ_REGEX = re.compile(r"\\begin{webtikz}{(.*?)}.*?\\end{webtikz}", re.DOTALL)
TITLE_REGEX = re.compile(r"\\title{(.*?)}")

def run_command(command, **kwargs):
    """Runs a command and prints its output, exiting on error."""
    print(f"  > Running command: {' '.join(command)}")
    try:
        # Use Popen to handle string input correctly for pandoc
        process = subprocess.run(command, check=True, capture_output=True, text=True, **kwargs)
        return process
    except subprocess.CalledProcessError as e:
        print("\n--- ERROR ---")
        print(f"Command failed with exit code {e.returncode}")
        print("Command: ", e.cmd)
        print("\n--- Stderr: ---")
        print(e.stderr)
        print("\n--- Stdout: ---")
        print(e.stdout)
        print("-------------")
        exit(1)

def process_single_tex_file(tex_filename):
    base_name = os.path.splitext(tex_filename)[0]
    source_path = os.path.join(SOURCE_DIR, tex_filename)
    print(f"--- Processing: {source_path} ---")

    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    title_match = TITLE_REGEX.search(content)
    hugo_title = title_match.group(1).strip() if title_match else base_name

    def convert_tikz_to_svg(match):
        diagram_id = match.group(1)
        standalone_tex = f"\\documentclass[standalone]{{article}}\\usepackage{{tikz, pgfplots}}\\pgfplotsset{{compat=1.17}}\\begin{{document}}{match.group(0)}\\end{{document}}"
        with open("_temp_diag.tex", "w", encoding='utf-8') as f: f.write(standalone_tex)
        
        print(f"  -> Compiling diagram: {diagram_id}...")
        run_command(["latex", "-interaction=batchmode", "_temp_diag.tex"])
        run_command(["dvisvgm", "--no-fonts", "-o", f"{SVG_OUTPUT_DIR}/{base_name}-{diagram_id}.svg", "_temp_diag.dvi"])
        
        return f"![{diagram_id}](/img/notes/{base_name}-{diagram_id}.svg)"

    content_with_images = TIKZ_REGEX.sub(convert_tikz_to_svg, content)
    
    hugo_md_path = os.path.join(HUGO_CONTENT_DIR, f"{base_name}.md")
    print(f"  -> Generating Markdown: {hugo_md_path}")
    
    pandoc_input = f"# {hugo_title}\n\n{content_with_images}"
    run_command(
        ["pandoc", "-f", "latex", "-t", "markdown", "--katex", "-o", hugo_md_path],
        input=pandoc_input
    )

    page_definitions = []
    for match in DEFINITION_REGEX.finditer(content):
        keyword, definition_text = match.group(1).strip(), match.group(2).strip().replace('\n', ' ')
        page_definitions.append({"keyword": keyword, "text": definition_text, "url": f"/notes/{base_name}/"})
    print(f"  -> Extracted {len(page_definitions)} definitions.")
    return page_definitions

# --- MAIN SCRIPT EXECUTION ---
if __name__ == "__main__":
    all_definitions = []
    
    # ** THE FIX IS HERE **
    # Get the directory for the search index file
    search_index_dir = os.path.dirname(SEARCH_INDEX_FILE)
    
    # Now include it in the list of directories to create
    for dir_path in [HUGO_CONTENT_DIR, PDF_OUTPUT_DIR, SVG_OUTPUT_DIR, search_index_dir]:
        os.makedirs(dir_path, exist_ok=True)

    if not any(f.endswith('.tex') for f in os.listdir(SOURCE_DIR)):
        print(f"ERROR: The '{SOURCE_DIR}' directory is empty or contains no .tex files. Please add your notes there.")
        exit(1)

    for filename in os.listdir(SOURCE_DIR):
        if filename.endswith(".tex"):
            definitions = process_single_tex_file(filename)
            all_definitions.extend(definitions)
            
            base_name = os.path.splitext(filename)[0]
            print(f"  -> Generating PDF with latexmk: {base_name}.pdf")
            run_command(["latexmk", "-pdf", f"-output-directory={PDF_OUTPUT_DIR}", os.path.join(SOURCE_DIR, filename)])
            run_command(["latexmk", "-c", f"-output-directory={PDF_OUTPUT_DIR}", os.path.join(SOURCE_DIR, filename)])

    with open(SEARCH_INDEX_FILE, "w", encoding='utf-8') as f:
        json.dump(all_definitions, f, indent=2)
    print(f"\nSuccessfully created search index with {len(all_definitions)} total entries.")

    # Final cleanup
    for ext in [".dvi", ".aux", ".log", ".out", ".fdb_latexmk", ".fls", ".synctex.gz"]:
        if os.path.exists(f"_temp_diag{ext}"): os.remove(f"_temp_diag{ext}")
    if os.path.exists("_temp_diag.tex"): os.remove("_temp_diag.tex")
    
    print("\nBuild complete! You can now run 'hugo server'.")