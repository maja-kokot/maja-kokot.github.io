# build_search.py (Simpler and more reliable)

import os
import json
import frontmatter # The new helper library

# --- CONFIGURATION ---
NOTES_CONTENT_DIR = "content/notes"
SEARCH_INDEX_FILE = "static/js/search_index.json"

if __name__ == "__main__":
    all_definitions = []
    
    print("--- Starting search index build ---")

    # Loop through all markdown files in the notes directory
    for filename in os.listdir(NOTES_CONTENT_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(NOTES_CONTENT_DIR, filename)
            
            # Use the library to safely load the file and its front matter
            post = frontmatter.load(filepath)
            
            # Check if there are any definitions in the front matter
            if 'definitions' in post.metadata:
                note_definitions = post.metadata['definitions']
                print(f"  -> Found {len(note_definitions)} definitions in {filename}")
                
                # Add the URL for each definition
                for definition in note_definitions:
                    definition['url'] = f"/notes/{filename.replace('.md', '')}/"
                    all_definitions.append(definition)

    # Ensure the static/js directory exists
    os.makedirs(os.path.dirname(SEARCH_INDEX_FILE), exist_ok=True)

    # Write the final JSON file
    with open(SEARCH_INDEX_FILE, "w", encoding='utf-8') as f:
        json.dump(all_definitions, f, indent=2)
        
    print(f"\nSuccessfully created search index with {len(all_definitions)} total entries.")
    print("Build complete! You can now run 'hugo server'.")