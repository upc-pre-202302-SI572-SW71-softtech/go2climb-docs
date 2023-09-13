# Markdown Documentation

Write documentation using Markdown, preview as HTML with live reload and render as PDF. Version control your document with Git.

## Why?

There's probably a lot of easier ways to do this. I just wanted to doing this in my own way. I also needed this for a project at uni.

## Requirements

- [Node.js](https://nodejs.org/en) (LTS, only tested with 18).
  - **Recommended:** install using a version manager like [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).
- [Yarn v2](https://yarnpkg.com/)
  - **Recommended:** enable corepack to automatically install Yarn: `corepack enable` on any terminal.

## Quick start

There's two ways you can start using this for your own documents.

### The recommended way

Create a [duplicate of the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository), then add this repository as the upstream remote so that you can pull and merge improvements and features made to the project.

```sh
# Add the upstream remote to your local copy of the repository
git remote add upstream https://github.com/dalbitresb12/markdown-docs.git
# Pull and merge the changes from the upstream
git pull upstream main
# Push the resulting commits to your repository
git push origin main
```

Anytime you want to pull the latest changes from upstream, you will have to run the **last 2 commands**. You may have to run the first command as well if you delete the upstream remote, use, delete and clone again another copy of your repo where you configured the upstream initially.

### Forking

Just click on the fork button at the top of the page. This will allow you to quickly start writing documentation, but PRs made in your repository will, by default, be directed to the upstream repository (this one). There's **no way to change this behavior** until GitHub makes it configurable.

> If you already forked the repository but want to move to using [the recommended way](#the-recommended-way), you can [request GitHub support to unlink your repository](https://stackoverflow.com/a/16052845/15040387) from this one. This will remove all the downsides of using a fork while keeping all the issues, PRs and commit history.

## Installing modules

Just run `yarn` on the workspace directory.

### Execution Policy and PowerShell

If you get any errors about an Execution Policy while trying to run any of the scripts provided in PowerShell, run the following command:

```pwsh
PS> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
Execution Policy Change
The execution policy helps protect you from scripts that you do not trust. Changing the execution policy might expose you to the security risks described in the about_Execution_Policies help topic at
https://go.microsoft.com/fwlink/?LinkID=135170. Do you want to change the execution policy?
[Y] Yes  [N] No  [S] Suspend  [?] Help (default is "Y"): Y
```

## Generating document

Run the following command:

```sh
# If you want to run a one-off render
yarn render
# If you want to watch for changes and re-render
yarn watch
```

### Previewing

Currently, there's no integrated server with live reload. There's plans for an integrated server, but on the meantime please use Ritwick Dey's [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

The repository already includes the configuration necessary to use this extension correctly. Just click on the "Go Live" button on the status bar (the bottom bar).

### PDF generation

Currently, there's no automatic generation of PDF. You can manually render the PDF by opening the preview server on any browser and using <kbd>Ctrl</kbd>+<kbd>P</kbd>.

## Writing documentation

The entrypoint for the renderer is [`docs/index.md`](docs/index.md). This file will be preprocessed with [markedpp](https://www.npmjs.com/package/markedpp). Also, if it has a front matter, it will be parsed by [gray-matter](https://www.npmjs.com/package/gray-matter).

The Markdown syntax chosen is MultiMarkdown 6, parsed by the [markdown-it](https://www.npmjs.com/package/markdown-it) and [markdown-it-multimd-table](https://www.npmjs.com/package/markdown-it-multimd-table). This syntax allows us to make better tables. You can check the [user guide](https://fletcher.github.io/MultiMarkdown-6/) or the [cheatsheet](https://rawgit.com/fletcher/MultiMarkdown-6-Syntax-Guide/master/index.html) for more info on how to make complex tables.

> There might be some differences with how markdown-it-multimd-table parses the file compared to the original multimarkdown binary.

### Front Matter

The front matter is only parsed for the entrypoint file.

```yaml
---
title: Document
lang: en
---
```

In the [rendered template](src/templates/markdown-template.hbs):

- `title` will be used for the header title element: `<title>{{title}}</title>`.
- `lang` will be used for the `html` tag attribute with the same name: `<html lang="{{lang}}">...</html>`

### Inserting table of contents

You can use any of the supported methods of [markdown-it-toc-done-right](https://www.npmjs.com/package/markdown-it-toc-done-right) to insert an automatic table of contents from the headers detected in the document. For example:

```markdown
## Table of contents

${toc}
```

### Including files

You can include any file in the `docs/` directory by using the following syntax:

```markdown
!include (file.ext)
```

This can be used to include other Markdown files to the entrypoint file, allowing you to separate your content into multiple files.

This can also be used to include any text file, which can be useful to include examples for code blocks. For example:

<details>
<summary>
example.js
</summary>

```javascript
console.log("Hello world");
```

</details>

<details>
<summary>
index.md
</summary>

> You can safely ignore the `// prettier-ignore` line, it is just needed to show the example correctly in this file.

````markdown
```javascript
// prettier-ignore
!include (example.js);
```
````

</details>

This will be preprocessed to the following Markdown document before rendering to HTML:

````markdown
```javascript
console.log("Hello world");
```
````

### Static files

Any images or other static files you want to include in your document must go on the `docs/static/` folder. This folder will get symlinked (or junctioned in Windows systems) to the `output/` folder so that the resulting HTML file can access it.

For example, the following document:

```markdown
![Alt text](static/image.png "Title")
```

Will render as:

```html
<img src="static/image.png" alt="Alt text" title="Title" />
```

### Inserting page breaks

```markdown
{.page-break}
```

This will create an empty element with the class `.page-break`, as follows:

```html
<p class="page-break"></p>
```

This element is setup to force a page break on the printed PDF file. It **will not** be shown in the HTML preview.

### Styling the document

The styles used by default are used in the following order:

- A modified version of the [Visual Studio Code light theme stylesheet](https://github.com/microsoft/vscode/blob/main/extensions/markdown-language-features/media/markdown.css) for the preview window.
- A modified version of the [stylesheet](https://github.com/yzane/vscode-markdown-pdf/blob/master/styles/markdown-pdf.css) used by [Yzane's Markdown PDF Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf).
- A modified version of the [printing styles](https://github.com/h5bp/html5-boilerplate/blob/72cdf1e96c6506c76c51e53abc1f2bd224776649/css/main.css#L234-L304) used by [HTML5 Boilerplate template](https://github.com/h5bp/html5-boilerplate/).
- A modified version of highlight.js [Visual Studio light theme](https://github.com/highlightjs/highlight.js/blob/main/src/styles/vs.css).

#### Custom styles

If you need to create custom styles for your document, you can include them in the file located at [`src/css/custom.css`](src/css/custom.css). This file will be loaded last so that you can override any of the base stylesheets.

To use your custom styles in your Markdown files, check the documentation of the [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs) plugin.

### Loaded plugins for markdown-it

In order of execution:

- [markdown-it-replace-link](https://www.npmjs.com/package/markdown-it-replace-link)
- [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor)
- [markdown-it-toc-done-right](https://www.npmjs.com/package/markdown-it-toc-done-right)
- [markdown-it-multimd-table](https://www.npmjs.com/package/markdown-it-multimd-table)
- [markdown-it-highlightjs](https://www.npmjs.com/package/markdown-it-highlightjs)
- [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)

### Template

The [template](src/templates/markdown-template.hbs) rendering is handled by [Handlebars](https://www.npmjs.com/package/handlebars).

### Code blocks

Syntax highlighting for code blocks is handled automatically by [highlight.js](https://www.npmjs.com/package/highlight.js). It has all the common languages loaded.

### Friendly URLs

Slugs for the table of contents and anchors are handled by [@sindresorhus/slugify](https://www.npmjs.com/package/@sindresorhus/slugify).

## License

[MIT](LICENSE)
