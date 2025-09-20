---
title: "My First Post"
date: 2025-09-05T19:00:00Z
draft: false
math: true
---

This is my first post! It's written in Markdown. Here's an example of an image:

## Code Blocks

Here is a Python code block with syntax highlighting, thanks to the `dracula` theme we set in `config.toml`.

```python
def hello_world():
    # This is a comment
    message = "Hello, Hugo!"
    print(message)

hello_world()
```

```language
your code goes here
```

 $$ I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} $$

This text includes an equation, like $ a^2 + b^2 = c^2 $, right in the middle of the line.

This is a paragraph. The equation below will be on its own line and centered.

$$
Your LaTeX code goes here
$$

The paragraph continues here.

The Schrödinger equation is fundamental to quantum mechanics:
$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
$$
This describes how a quantum state evolves over time.

To write an inline equation, we now use the katex shortcode: {{< katex >}}a^2 + b^2 = c^2{{< /katex >}}.
For a centered, display equation, we use the shortcode with the display="true" parameter:
{{< katex display="true" >}}
I = \begin{pmatrix} 1 & 0 \ 0 & 1 \end{pmatrix}
{{< /katex >}}
The Schrödinger equation is fundamental to quantum mechanics:
{{< katex display="true" >}}
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t)\right]\Psi(\mathbf{r},t)
{{< /katex >}}