import fse from "fs-extra";
import tempWrite from "temp-write";
import { dirname, join } from "path";
import { updateCordovaPluginVersion } from "..";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("updateCordovaPluginVersion", async () => {
  const pluginXml = join(__dirname, "fixtures/plugin.xml");
  const filename = await tempWrite(await fse.readFile(pluginXml, "utf8"));
  const { before, after } = await updateCordovaPluginVersion(filename, "0.0.1");
  expect(before).toBe("0.0.0");
  expect(after).toBe("0.0.1");
});

test("tab", async () => {
  const pluginXml = join(__dirname, "fixtures/plugin-tab.xml");
  const filename = await tempWrite(await fse.readFile(pluginXml, "utf8"));
  const { before, after } = await updateCordovaPluginVersion(filename, "0.0.1");
  expect(before).toBe("0.0.0");
  expect(after).toBe("0.0.1");
});
