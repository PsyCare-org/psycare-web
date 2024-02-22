# PsyCare Web
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PsyCare-org/psycare-web/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/PsyCare-org/psycare-web/blob/main/README.pt-br.md)

## Sobre
Aplicação web que fornece a interface do usuário para o aplicativo PsyCare. Ele consome seu respectivo back-end, a [API PsyCare](https://github.com/PsyCare-org/psycare-api). As principais tecnologias utilizadas no desenvolvimento foram:
* [ReactJS](https://react.dev/)
* [MUI](https://mui.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Socket.IO](https://socket.io/)

## Começando
### Pré-requisitos
Você precisará do [NodeJS](https://nodejs.org/en/download/), e um gerenciador de pacotes de sua preferência.

### Variáveis de ambiente
Na raiz do projeto, crie um arquivo chamado `.env`, com o seguinte conteúdo, preencendo-o com os seus valores:
```
REACT_APP_API_URL=<URL da API PsyCare>
REACT_APP_WS_URL=<URL do WebSocket PsyCare>
REACT_APP_CALL_TOKEN=<Token de API gerado dentro da plataforma VideoSDK>
```

O arquivo `.env.example` contém um exemplo de como o arquivo de variáveis de ambiente deve se parecer.

### Instalação
1. Clone o repositório
   ```sh
   git clone https://github.com/PsyCare-org/psycare-web
   ```
2. Instale os pacotes
   ```sh
   npm install
   ```
4. Execute-o
   ```sh
   npm start
   ```

## Utilização
O aplicativo é bastante autoexplicativo, mas precisa ser utilizado juntamente com seu back-end, a [API PsyCare](https://github.com/PsyCare-org/psycare-api).

## Licensa
Distribuído sob a licença MIT. Veja `LICENSE.txt` para mais informações.