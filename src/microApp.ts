import microApp from "@micro-zoe/micro-app";

microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值
      lhzh: [
        {
          loader(code) {
            if (import.meta.env.DEV) {
              // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              code = code
                .replace(
                  /(from|import)(\s*['"])(\/lhzh\/)/g,
                  (all) => {
                    return all.replace(
                      "/lhzh/",
                      "http://localhost:80/lhzh/"
                    );
                  }
                )
            }

            return code;
          },
        },
      ],
    },
  },
});
