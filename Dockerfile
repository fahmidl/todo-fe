# Gunakan image Node.js versi 18.4.1 yang minimal dan aman untuk build
FROM node:22-alpine AS build

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin kode sumber aplikasi
COPY . .

# Build aplikasi
RUN npm run build

# Gunakan image Nginx yang minimal dan aman untuk serving
FROM nginx:alpine

# Salin build output dari tahap build ke direktori Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Salin konfigurasi Nginx yang aman
COPY default.conf /etc/nginx/conf.d/default.conf

# Tentukan port yang akan digunakan
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]