import header from "./header.js"
import footer from "./footer.js"
import load from "./load.js"
export default function frame() {
    return `
        ${header()}
        ${load()}
        <div id="main" class="min-h-[50vh]">
        </div>
        ${footer()}
    `
}
