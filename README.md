# osodreamer-sri-xml-signer

**Tu solución completa para emitir comprobantes electrónicos válidos ante el SRI de Ecuador.**  
Genera, firma, valida y autoriza comprobantes XML cumpliendo los estándares oficiales del SRI, todo desde una sola librería optimizada para **Node.js**, **TypeScript** y **NestJS**.

---

## 📚 Índice

- [🚀 ¿Qué hace esta librería?](#-qué-hace-esta-librería)
- [🚀 Instalación](#-instalación)
- [🧩 Uso del generador de XML](#-uso-del-generador-de-xml-en-nodejs)
- [🔏 Firmar comprobante XML](#-uso-del-firmador-de-comprobante-en-nodejs)
- [🧪 Validar comprobante en el SRI](#-uso-del-validador-de-comprobante-soap-sri-en-nodejs)
- [✅ Autorizar comprobante SRI](#-uso-del-autorizar-comprobante-soap-sri-en-nodejs)
- [📦 Compatibilidad](#-compatibilidad)
- [📚 CommonJS vs ESM](#-commonjs-vs-ecmascript-modules-esm)
- [👨‍💻 Autor](#-autor)
- [📄 Licencia](#-licencia)

---

## 🚀 ¿Qué hace esta librería?

- 🧾 **Genera comprobantes electrónicos tipo factura** en formato XML conforme al **ANEXO 3 - FORMATOS XML VERSIÓN 1.1.0**
- ✅ **Valida los datos de forma estricta** según los campos requeridos por el SRI
- 📎 **Soporta adicionalmente los requisitos del:**
  - **ANEXO 21** – para agentes de retención (opcional)
  - **ANEXO 22** – para contribuyentes RIMPE (opcional)
- 🔏 **Firma electrónicamente** cualquier tipo de comprobante XML válido (factura, retención, nota de crédito, etc.) con certificados `.p12` bajo el estándar **XAdES-BES**
- 📡 **Valida y autoriza comprobantes** mediante servicios SOAP oficiales del **SRI** (ambientes de prueba y producción)
- 📦 Compatible con:
  - **Node.js**
  - **TypeScript**
  - **NestJS**
  - **CommonJS y ESM**

> ⚠️ Por el momento, esta librería **solo implementa la generación XML para comprobantes tipo factura**.  
> Sin embargo, **el firmado, validación y autorización funcionan para cualquier comprobante XML compatible con el SRI.**

> 🧑‍💻 Ideal para desarrolladores, sistemas de facturación electrónica, ERP personalizados y soluciones empresariales que requieren cumplimiento normativo con el SRI.

---

## 🚀 Instalación

```bash
npm install osodreamer-sri-xml-signer
```

---

## 🧩 Uso del generador de XML en Node.js [Modelo de datos](#-modelo-de-datos-del-generador)

```ts
import { generateXmlInvoice } from "osodreamer-sri-xml-signer";
import * as fs from "fs";

const generatedXmlResponse = await generateXmlInvoice({
  //modelo de datos
});
const { generatedXml, invoiceJson } = generatedXmlResponse;
fs.writeFileSync("./comprobante_generado.xml", generatedXml);
console.log(invoiceJson);
```

## 🧪 API

### `generateXmlInvoice(invoice: ComprobanteType): Promise<ResponseGenerateXmlModel>`

Genera un comprobante(Factura) XML.

#### Parámetros

| Nombre    | Tipo              | Descripción                           |
| --------- | ----------------- | ------------------------------------- |
| `invoice` | `ComprobanteType` | Json con el modelo de datos `Factura` |

#### Retorna

- `Promise<ResponseGenerateXmlModel>` – XML generado como cadena y XML transformado a json.

---

## 🧩 Uso del firmador de comprobante en Node.js

```ts
import { signXml } from "osodreamer-sri-xml-signer";
import * as fs from "fs";

const p12Buffer = fs.readFileSync("./certificado.p12");
const xmlBuffer = fs.readFileSync("./comprobante_generado.xml");

const signedXml = await signXml({
  p12Buffer,
  password: "tu-contraseña",
  xmlBuffer,
});

console.log(signedXml);
fs.writeFileSync("./comprobante_firmado.xml", signedXml);
```

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

## 🧩 Uso del validador de comprobante soap SRI en Node.js [Modelo de datos](#-modelo-de-datos-del-validador)

```ts
import { validateXml } from "osodreamer-sri-xml-signer";
import * as fs from "fs";

const xml = fs.readFileSync("./comprobante_firmado.xml");


onst validatedXmlResponse = await validateXml(xml, 'test'); // "test" o "prod"

console.log(validatedXmlResponse);
```

## 🧪 API

### `validateXml(xml: Uint8Array,env: SRIEnv): Promise<{ estado: string; mensaje?: string }>`

Valida un comprobante XML mediante sopa del SRI acorde al ambiente.

#### Parámetros

| Nombre | Tipo         | Descripción                                |
| ------ | ------------ | ------------------------------------------ |
| `xml`  | `Uint8Array` | XML del comprobante a enviar al sri `.p12` |
| `env`  | `SRIEnv`     | Ambiente correspondiente test o prod       |

#### Retorna

- `Promise<{ estado: string; mensaje?: string }>` – Estado retornado por el SRI y mensaje

---

## 🧩 Uso del autorizar comprobante, soap SRI en Node.js

```ts
import { authorizeXml } from "osodreamer-sri-xml-signer";
const claveAcceso = "clave de acceso del comprobante";
const authorizedXmlResponse = await authorizeXml(claveAcceso, "test"); // "test" o "prod"

console.log(authorizedXmlResponse);
```

## 🧪 API

### `authorizeXml( claveAcceso: string,env: SRIEnv): Promise<SriAuthorizationResult>`

Autoriza un comprobante XML mediante soap del SRI a corde al ambiente.

#### Parámetros

| Nombre        | Tipo     | Descripción                          |
| ------------- | -------- | ------------------------------------ |
| `claveAcceso` | `string` | clave de acceso del `comprobante`    |
| `env`         | `SRIEnv` | Ambiente correspondiente test o prod |

#### Retorna

- `Promise<SriAuthorizationResult>` – Estado retornado por el SRI y mensaje

---

## 📦 Compatibilidad

| Entorno | Compatible |
| ------- | ---------- |
| Node.js | ✅         |

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

## 🧩 Modelo de datos del generador

```ts
class InfoTributariaModel {
  ambiente: ENV_ENUM;
  razonSocial: string;
  nombreComercial?: string;
  ruc: string;
  estab: string;
  ptoEmi: string;
  secuencial: string;
  dirMatriz: string;
  agenteRetencion?: string;
  contribuyenteRimpe?: CONTRIBUYENTE_RIMPE_ENUM;
}

class TotalImpuestoModel {
  codigo: TAX_CODE_ENUM;
  codigoPorcentaje: number;
  baseImponible: number;
  valor: number;
  descuentoAdicional?: number;
}

class TotalConImpuestosModel {
  totalImpuesto: TotalImpuestoModel[];
}

class PagoModel {
  formaPago: PAYMENT_METHOD_CODE_ENUM;
  total: number;
  plazo?: number;
  unidadTiempo?: string;
}

class PagosModel {
  pago: PagoModel[];
}

class InfoFacturaModel {
  fechaEmision: Date;
  dirEstablecimiento: string;
  contribuyenteEspecial?: string;
  obligadoContabilidad?: OBLIGADO_CONTABILIDAD_ENUM;
  tipoIdentificacionComprador: IDENTIFICATION_CODE_ENUM;
  guiaRemision?: string;
  razonSocialComprador: string;
  identificacionComprador: string;
  direccionComprador?: string;
  totalSinImpuestos: number;
  totalDescuento: number;
  totalConImpuestos: TotalConImpuestosModel;
  propina: number;
  importeTotal: number;
  moneda?: string;
  pagos: PagosModel;
  valorRetIva?: number;
  valorRetRenta?: number;
}

class DetAdicionalModel {
  nombre: string;
  valor: string;
}

class ImpuestoDetalleModel {
  codigo: TAX_CODE_ENUM;
  codigoPorcentaje: number;
  tarifa: number;
  baseImponible: number;
  valor: number;
}

class DetallesAdicionalesModel {
  detAdicional: DetAdicionalModel[];
}

class ImpuestosModel {
  impuesto: ImpuestoDetalleModel[];
}

class DetalleModel {
  codigoPrincipal: string;
  codigoAuxiliar?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  precioTotalSinImpuesto: number;
  detallesAdicionales?: DetallesAdicionalesModel;
  impuestos: ImpuestosModel;
}

class CampoAdicionalModel {
  nombre: string;
  value: string;
}

class InfoAdicionalModel {
  campoAdicional: CampoAdicionalModel[];
}

class DetallesModel {
  detalle: DetalleModel[];
}

class RetencionModel {
  codigo: IMPUESTO_A_RETENER_ENUM;
  codigoPorcentaje: CODIGO_RETENCION_ENUM;
  tarifa: number;
  valor: number;
}

class RetencionesModel {
  retencion: RetencionModel[];
}

class ComprobanteModel {
  infoTributaria: InfoTributariaModel;
  infoFactura: InfoFacturaModel;
  detalles: DetallesModel;
  retenciones?: RetencionesModel;
  infoAdicional?: InfoAdicionalModel;
}
type ComprobanteType = InstanceType<typeof ComprobanteModel>;

enum ENV_ENUM {
  TEST = 1,
  PROD = 2,
}
enum TAX_CODE_ENUM {
  VAT = 2, // IVA
  ICE = 3, // Impuesto a los Consumos Especiales
  IRBPNR = 5, // Impuesto Redimible a las Botellas Plásticas no Retornables
}
enum CONTRIBUYENTE_RIMPE_ENUM {
  RIMPE_GENERAL = "CONTRIBUYENTE RÉGIMEN RIMPE",
  RIMPE_POPULAR = "CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE",
}
enum OBLIGADO_CONTABILIDAD_ENUM {
  SI = "SI",
  NO = "NO",
}
enum PAYMENT_METHOD_CODE_ENUM {
  SIN_UTILIZACION_DEL_SISTEMA_FINANCIERO = "01",
  COMPENSACION_DE_DEUDAS = "15",
  TARJETA_DE_DEBITO = "16",
  DINERO_ELECTRONICO = "17",
  TARJETA_PREPAGO = "18",
  TARJETA_DE_CREDITO = "19",
  OTROS_CON_SISTEMA_FINANCIERO = "20",
  ENDOSO_DE_TITULOS = "21",
}
enum IDENTIFICATION_CODE_ENUM {
  RUC = "04",
  CEDULA = "05",
  PASAPORTE = "06",
  CONSUMIDOR_FINAL = "07",
  EXTERIOR = "08",
}

enum CODIGO_RETENCION_ENUM {
  IVA_CIENTO_POR_CIENTO_RESOLUCION = 3,

  IVA_DOCE_POR_CIENTO_PRESUNTIVO_EDITORES = 4,

  IVA_CIENTO_POR_CIENTO_DISTRIBUIDORES = 5,

  IVA_CIENTO_POR_CIENTO_VOCEADORES = 6,

  RENTA_DOS_POR_MIL = 327,

  RENTA_TRES_POR_MIL = 328,
}

enum IMPUESTO_A_RETENER_ENUM {
  IVA_PRESUNTIVO_Y_RENTA = 4,
}
```

---

## 🧩 Modelo de datos del validador

```ts
type SRIEnv = "test" | "prod";
```

---

## 🧩 Modelo de datos del autorizador

```ts
type SRIEnv = "test" | "prod";
interface SriAuthorizationMessage {
  identificador: string;
  mensaje: string;
  tipo: string;
  informacionAdicional?: string;
}

interface SriAuthorizationResult {
  claveAcceso: string;
  estadoAutorizacion: string;
  comprobante: string;
  rucEmisor: string;
  fechaAutorizacion: string;
  ambiente: string;
  mensajes: SriAuthorizationMessage[] | null;
}
```

---

## 👨‍💻 Autor

Desarrollado por [Jose Gusñay](https://www.linkedin.com/in/jose-segundo-gus%C3%B1ay-cela-770906181)  
✉️ jcjunior308@gmail.com  
🌐 https://osodreamer.dev

---

## 📄 Licencia

MIT
