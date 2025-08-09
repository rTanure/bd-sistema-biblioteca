# Etapa base: usar imagem oficial do Node
FROM node:22-alpine

# Instalar dependências do sistema necessárias (opcional para bcrypt, etc.)
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json/yarn.lock
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do servidor
EXPOSE 3000

# Comando padrão: modo desenvolvimento
CMD ["npm", "run", "dev"]
