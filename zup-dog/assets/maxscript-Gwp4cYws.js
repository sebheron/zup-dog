import{g as u}from"./index-Q1RCDH1s.js";function l(t,n){for(var r=0;r<n.length;r++){const e=n[r];if(typeof e!="string"&&!Array.isArray(e)){for(const o in e)if(o!=="default"&&!(o in t)){const a=Object.getOwnPropertyDescriptor(e,o);a&&Object.defineProperty(t,o,a.get?a:{enumerable:!0,get:()=>e[o]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var i,s;function d(){if(s)return i;s=1,i=t,t.displayName="maxscript",t.aliases=[];function t(n){(function(r){var e=/\b(?:about|and|animate|as|at|attributes|by|case|catch|collect|continue|coordsys|do|else|exit|fn|for|from|function|global|if|in|local|macroscript|mapped|max|not|of|off|on|or|parameters|persistent|plugin|rcmenu|return|rollout|set|struct|then|throw|to|tool|try|undo|utility|when|where|while|with)\b/i;r.languages.maxscript={comment:{pattern:/\/\*[\s\S]*?(?:\*\/|$)|--.*/,greedy:!0},string:{pattern:/(^|[^"\\@])(?:"(?:[^"\\]|\\[\s\S])*"|@"[^"]*")/,lookbehind:!0,greedy:!0},path:{pattern:/\$(?:[\w/\\.*?]|'[^']*')*/,greedy:!0,alias:"string"},"function-call":{pattern:RegExp("((?:"+(/^/.source+"|"+/[;=<>+\-*/^({\[]/.source+"|"+/\b(?:and|by|case|catch|collect|do|else|if|in|not|or|return|then|to|try|where|while|with)\b/.source)+")[ 	]*)(?!"+e.source+")"+/[a-z_]\w*\b/.source+"(?=[ 	]*(?:"+("(?!"+e.source+")"+/[a-z_]/.source+"|"+/\d|-\.?\d/.source+"|"+/[({'"$@#?]/.source)+"))","im"),lookbehind:!0,greedy:!0,alias:"function"},"function-definition":{pattern:/(\b(?:fn|function)\s+)\w+\b/i,lookbehind:!0,alias:"function"},argument:{pattern:/\b[a-z_]\w*(?=:)/i,alias:"attr-name"},keyword:e,boolean:/\b(?:false|true)\b/,time:{pattern:/(^|[^\w.])(?:(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?[msft])+|\d+:\d+(?:\.\d*)?)(?![\w.:])/,lookbehind:!0,alias:"number"},number:[{pattern:/(^|[^\w.])(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?|0x[a-fA-F0-9]+)(?![\w.:])/,lookbehind:!0},/\b(?:e|pi)\b/],constant:/\b(?:dontcollect|ok|silentValue|undefined|unsupplied)\b/,color:{pattern:/\b(?:black|blue|brown|gray|green|orange|red|white|yellow)\b/i,alias:"constant"},operator:/[-+*/<>=!]=?|[&^?]|#(?!\()/,punctuation:/[()\[\]{}.:,;]|#(?=\()|\\$/m}})(n)}return i}var c=d();const p=u(c),f=l({__proto__:null,default:p},[c]);export{f as m};
