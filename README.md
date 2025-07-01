# osodreamer-sri-xml-signer

Firma comprobantes XML con certificados digitales `.p12` usando el estándar **XAdES-BES**, orientado al **SRI de Ecuador**.  
Funciona en **Node.js** y también en el **navegador (Angular u otros frameworks)**.

---

## 🚀 Instalación

```bash
npm install osodreamer-sri-xml-signer
```

---

## 🧩 Uso en Node.js

```ts
import { signXml } from "osodreamer-sri-xml-signer";
import * as fs from "fs";

const p12Buffer = fs.readFileSync("./certificado.p12");
const xmlBuffer = fs.readFileSync("./comprobante.xml");

const signedXml = await signXml({
  p12Buffer,
  password: "tu-contraseña",
  xmlBuffer,
});

fs.writeFileSync("./comprobante_firmado.xml", signedXml);
```

---

## 🌐 Uso en el navegador (Angular, React, etc.)

```ts
import { signXml } from "osodreamer-sri-xml-signer";

async function firmarArchivo(p12File: File, xmlFile: File) {
  const p12Buffer = new Uint8Array(await p12File.arrayBuffer());
  const xmlBuffer = new Uint8Array(await xmlFile.arrayBuffer());

  const signedXml = await signXml({
    p12Buffer,
    password: "tu-contraseña",
    xmlBuffer,
  });

  console.log("XML firmado:", signedXml);
}
```

---

## 🧪 API

### `signXml(cmd: SignXmlCommand): Promise<string>`

Firma un comprobante XML.

#### Parámetros

| Nombre      | Tipo         | Descripción                      |
| ----------- | ------------ | -------------------------------- |
| `p12Buffer` | `Uint8Array` | Contenido del certificado `.p12` |
| `password`  | `string`     | Contraseña del certificado       |
| `xmlBuffer` | `Uint8Array` | XML del comprobante a firmar     |

#### Retorna

- `Promise<string>` – XML firmado como cadena.

---

## 📦 Compatibilidad

| Entorno      | Compatible |
| ------------ | ---------- |
| Node.js      | ✅         |
| Angular      | ✅         |
| React        | ✅         |
| Vite/Webpack | ✅         |

---

## 📚 CommonJS vs ECMAScript Modules (ESM)

Esta librería soporta **CommonJS (CJS)** y **ESM**, por lo que puedes usarla como prefieras.

### 🔁 CommonJS (CJS)

```js
const { signXml } = require("osodreamer-sri-xml-signer");
```

### 📦 ESM

```js
import { signXml } from "osodreamer-sri-xml-signer";
```

---

## 👨‍💻 Autor

Desarrollado por [Jose Gusñay](https://www.linkedin.com/in/jose-segundo-gus%C3%B1ay-cela-770906181)  
✉️ jcjunior308@gmail.com  
🌐 https://osodreamer.dev

---

## 📄 Licencia

MIT
