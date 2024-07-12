type ExportType = {
  getHeader: () => string;
  getFooter: () => string;
};

export const Exports: Record<string, ExportType> = {
  canvas: {
    getHeader: () => {
      return `const zcanvas = document.querySelector("canvas");`;
    },
    getFooter: () => {
      return "";
    },
  },
  script: {
    getHeader: () => {
      return `import { Scene } from "zdog";`;
    },
    getFooter: () => {
      return `//end of script`;
    },
  },
  tag: {
    getHeader: () => {
      return `<script>`;
    },
    getFooter: () => {
      return `</script>`;
    },
  },
};

export type ExportKey = keyof typeof Exports;
