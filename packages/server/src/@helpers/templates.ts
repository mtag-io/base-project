import * as path from "path";
import { promises as fs } from "fs";
import Handlebars from "handlebars";
import { TEMPLATE_PAGES_PATH } from "../@config/templates.config";
import { ENDPOINTS } from "../@config/endpoints.config";
import { SLASH } from "../@constants";

export const getTemplate = async (tpl: string) => {
  const source = await fs.readFile(
    path.join(TEMPLATE_PAGES_PATH, tpl), "utf8"
  );
  return Handlebars.compile(source);
};

export const createAccessUrl = (hash: string, type): string =>
  [ENDPOINTS[type], hash].join(SLASH);
