import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { markdownStyling, markDownToText } from "../../assets/util/UtilMarkdownStyling.jsx";
import { pickAColor } from "../../assets/util/UtilPickRandomColor.js";

export default function NotePreviewer({previewableContent, showPreview }) {
  const randomColor = pickAColor();

  return (
    <div className={`fixed grid grid-cols-12 grid-rows-12 z-30 w-[90svw] lg:w-[80svw] xl:w-[60svw] h-[80svh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-7 pb-6 overflow-y-scroll rounded-md bg-white text-slate-800 dark:bg-slate-700 ${showPreview ? 'scale-100' : 'scale-0'} transition-all duration-300`}>
      <h1 className={`cal-sans col-span-12 row-start-0 row-end-1 bg-white dark:bg-slate-700 dark:text-white py-5 text-center text-2xl lg:text-4xl font-bold`}>{previewableContent?.title}</h1>
      <h2 className={`fira-mono place-self-end col-start-7 col-end-13 row-start-1 row-end-2 font-semibold text-[18px] dark:bg-slate-700 dark:text-white`}>{new Date(previewableContent.created_at?.replace('Z', '+06:00')).toLocaleDateString()}</h2>
      <div className={`col-span-12 row-start-2 row-end-12 overflow-y-scroll bg-gray-100 py-4 px-3 my-2 rounded-lg dark:bg-slate-500 dark:text-white`}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={markdownStyling}
        >{markDownToText(previewableContent?.note)}
        </Markdown>
      </div>
      <p className={`w-fit h-fit row-start-12 row-end-13 ${randomColor} shadow-md fira-mono truncate p-1.5 flex items-center rounded-full`}>{previewableContent.tag}</p>
    </div>
  );
}