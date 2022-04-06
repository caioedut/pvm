## Docs
[https://confluence.unyleya.com.br/pages/viewpage.action?pageId=27585744](https://confluence.unyleya.com.br/pages/viewpage.action?pageId=27585744)
<br/>
[https://confluence.unyleya.com.br/pages/viewpage.action?pageId=27585727](https://confluence.unyleya.com.br/pages/viewpage.action?pageId=27585727)

## Cofiguração
Crie um arquivo `.env` na raiz e configure os valores se baseando no arquivo `.env.example` que está no repositório.

### GitFlow
```ssh
[gitflow "branch"]
    master = master
    develop = develop
```

## UI
O Material UI (v5) foi utilizado como biblioteca de UI. Acesse a documentação em: [https://mui.com/pt/versions](https://mui.com/pt/versions).

## Scripts
### `yarn dev`
Executa o aplicativo no modo de desenvolvimento, em [http://localhost:3000](http://localhost:3000).

### `yarn gen`
Para gerar páginas e componentes a partir do template padrão, utilize como nos exemplos:
```ssh
yarn gen page common/Error404
yarn gen page admin/Dashboard
yarn gen page admin/Dashboard/form
yarn gen component Button
```

### `yarn build`
Compila o aplicativo para produção na pasta `build`.
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.
