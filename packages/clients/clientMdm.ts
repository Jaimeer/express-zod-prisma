type GetV1HelloInput = {
    name?: string | undefined;
};

type GetV1HelloResponse = {
    status: "success";
    data: {
        greetings: string;
    };
} | {
    status: "error";
    error: {
        message: string;
    };
};

export type Path = "/v1/hello";

export type Method = "get" | "post" | "put" | "delete" | "patch";

export type MethodPath = `${Method} ${Path}`;

export interface Input extends Record<MethodPath, any> {
    "get /v1/hello": GetV1HelloInput;
}

export interface Response extends Record<MethodPath, any> {
    "get /v1/hello": GetV1HelloResponse;
}

export const jsonEndpoints = { "get /v1/hello": true };

export type Provider = <M extends Method, P extends Path>(method: M, path: P, params: Input[`${M} ${P}`]) => Promise<Response[`${M} ${P}`]>;

export type Implementation = (method: Method, path: string, params: Record<string, any>) => Promise<any>;

/*
export const exampleImplementation: Implementation = async (
  method,
  path,
  params
) => {
  const searchParams =
    method === "get" ? `?${new URLSearchParams(params)}` : "";
  const response = await fetch(`https://example.com${path}${searchParams}`, {
    method: method.toUpperCase(),
    headers:
      method === "get" ? undefined : { "Content-Type": "application/json" },
    body: method === "get" ? undefined : JSON.stringify(params),
  });
  if (`${method} ${path}` in jsonEndpoints) {
    return response.json();
  }
  return response.text();
};

const client = new ExpressZodAPIClient(exampleImplementation);
client.provide("get", "/v1/user/retrieve", { id: "10" });
*/
export class ExpressZodAPIClient {
    constructor(protected readonly implementation: Implementation) { }
    public readonly provide: Provider = (method, path, params) => this.implementation(method, Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), path), Object.keys(params).reduce((acc, key) => path.indexOf(`:${key}`) >= 0 ? acc : { ...acc, [key]: params[key] }, {}));
}