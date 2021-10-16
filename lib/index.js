import fse from "fs-extra";

export async function updateCordovaPluginVersion(filename, version) {
  const versionRE = /<plugin [\S\s]*?\sversion=\s*["']?([^\s"']+)/m;
  const data = await fse.readFile(filename, "utf8");
  const match = versionRE.exec(data);
  if (!match) {
    throw new Error(`cannot find version property in ${filename}`);
  }

  const versionCurrent = match[1];
  const result = {
    filename,
    before: versionCurrent,
    after: version,
  };
  if (versionCurrent === version) {
    return result;
  }

  const content = [
    data.substring(0, match.index + match[0].length - versionCurrent.length),
    version,
    data.substring(match.index + match[0].length),
  ].join("");
  await fse.writeFile(filename, content);
  return result;
}
