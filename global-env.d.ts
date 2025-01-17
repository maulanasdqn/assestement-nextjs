import { z } from "zod";
import { envServerSchemaObj } from "./src/configs/env-server.config";
import { envClientSchemaObj } from "./src/configs/env-client.config";

const envServerSchema = z.object(envServerSchemaObj);
const envClientSchema = z.object(envClientSchemaObj);

type EnvServerSchemaType = z.infer<typeof envServerSchema>;
type EnvClientSchemaType = z.infer<typeof envClientSchema>;

type EnvSchemaType = Partial<EnvServerSchemaType> & EnvClientSchemaType;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
