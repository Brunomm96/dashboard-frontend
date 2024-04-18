/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_URL_CALC_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
