import path from "path";
export default {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
};
