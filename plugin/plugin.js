import { createReadStream } from "fs";
import { join } from "path";

import svg2ttf from "svg2ttf";
import { SVGIcons2SVGFontStream } from "svgicons2svgfont";


export default async function(rJS, filesystem, config, __, $PATH) {
    return new Promise((resolve, reject) => {
        const fontStream = new SVGIcons2SVGFontStream({
            fontName: "Iconfont",
        })
        .on("finish", async () => {
            const chunks = [];
            for await (const chunk of fontStream) {
                chunks.push(Buffer.from(chunk));
            }

            resolve(
                new rJS.File(
                    (config.outPath ?? "/iconfont.ttf").replace(/(\.ttf)?$/i, ".ttf"),
                    svg2ttf(Buffer.concat(chunks).toString("utf-8")).buffer
                )
            );
        })
        .on("error", reject);

        let i = 0;
        filesystem
        .get("/icons")
        .traverse(file => {
            if(file.extension !== "svg") return;
            
            const unicode = String.fromCharCode(0xE000 + i++);
            const glyph = createReadStream(join($PATH, "icons", `${file.name}.svg`));
            glyph.metadata = {
                unicode: [ unicode ],
                name: `icon-${i}`
            };
            fontStream.write(glyph);
        });
        
        fontStream.end();
    });
}