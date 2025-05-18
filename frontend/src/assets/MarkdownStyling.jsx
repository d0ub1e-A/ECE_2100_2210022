export const markdownStyling = {
  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 farro" {...props}></h1>,
  h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 patrick-hand tracking-wider" {...props}></h2>,
  h3: ({ node, ...props }) => <h3 className="font-bold mb-3 patrick-hand tracking-wider" {...props}></h3>,
  p: ({ node, ...props }) => <p className="mb-2 patrick-hand tracking-wider" {...props}></p>,
  ul: ({ node, ...props }) => <ul className="list-disc px-8 mb-4 patrick-hand tracking-wider" {...props}></ul>,
  ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 patrick-hand tracking-wider" {...props}></ol>,
  table: ({ node, ...props }) => <table className={`w-full my-2 patrick-hand tracking-wider`} {...props}></table>,
  td: ({ node, ...props }) => <td className={`border border-slate-300 p-1 patrick-hand tracking-wider`} {...props}></td>,
  hr: ({ node, ...props }) => <hr className={`my-3 border border-slate-300 patrick-hand tracking-wider`} {...props}/>,
  th: ({ node, ...props }) => <th className={`border border-slate-300 p-1 bg-slate-200 patrick-hand tracking-wider`} {...props}></th>,
  a: ({ node, ...props }) => <a target="_blank" className={`hover:underline text-indigo-600 visited:text-indigo-300 patrick-hand tracking-wider`} {...props}></a>,
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <code
        className={`block fira-mono bg-gray-200 text-green-950 shadow-md p-4 rounded text-[16px] overflow-x-auto ${className}`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <code
        className={`bg-gray-200 fira-mono text-slate-700 px-1 py-0.5 rounded text-sm`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ node, children, ...props }) => 
    <pre className="my-4 rounded-md bg-transparent fira-mono" {...props}>
      {children}
    </pre>,
  blockquote: ({ node, ...props }) => <blockquote className={`bg-gray-200 text-slate-800 p-2.5 rounded-lg my-4`} {...props}></blockquote>,
}

export function markDownToText(mdText) {
  if (!mdText) return '**Nothing noted down. Jot down your ideas in markdown...**';

  try {
    // First try to decode base64
    const decodedBytes = Uint8Array.from(atob(mdText), c => c.charCodeAt(0));
    const decodedText = new TextDecoder().decode(decodedBytes);
    
    // If decoded text looks valid, return it
    if (decodedText && !decodedText.includes('�')) {
      return decodedText;
    }
    // If decoded text looks corrupted, return original
    return mdText;
  } catch {
    // If decoding fails, return original text
    return mdText;
  }
}