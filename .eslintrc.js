module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals":{
      "CustomError": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "import/prefer-default-export": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
      "class-methods-use-this": "off",
      "camelcase":"off",
      "max-len": ["error", { "code": 180 }],
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "_"
        }
      ],
      "no-tabs": "off"
    }
};
