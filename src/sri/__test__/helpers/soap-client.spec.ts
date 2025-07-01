// __tests__/soap-client.spec.ts

import * as soap from "soap";
import { createSoapClient } from "../../helpers";

jest.mock("soap");

describe("createSoapClient", () => {
  it("debería crear un cliente SOAP con la URL proporcionada", async () => {
    const mockClient = { someMethod: jest.fn() };
    const mockCreateClientAsync = jest.fn().mockResolvedValue(mockClient);

    // Sobreescribimos el método del mock
    (soap.createClientAsync as jest.Mock) = mockCreateClientAsync;

    const wsdlUrl = "https://example.com/service.wsdl";

    const client = await createSoapClient(wsdlUrl);

    expect(mockCreateClientAsync).toHaveBeenCalledWith(wsdlUrl);
    expect(client).toBe(mockClient);
  });
});
