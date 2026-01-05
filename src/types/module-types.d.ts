declare module '*.url' {
  const content: string;
  export default content;
}

declare module '*.worker.min?url' {
  const content: string;
  export default content;
}

// Vite import.meta types
interface ImportMetaEnv {
  [key: string]: string | boolean | undefined;
  readonly PACKAGE_VERSION?: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: (pattern: string, options?: { eager?: boolean; import?: string }) => Record<string, any>;
}
