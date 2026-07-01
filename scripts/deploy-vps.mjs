import { spawnSync } from "node:child_process";

const host = "109.172.36.182";
const user = "root";
const appDir = "/srv/sborkai/app";
const serviceName = "sborkai";
const sshKey = process.env.SBORKAI_SSH_KEY ?? "/Users/lera/.ssh/sborkai_beget_ed25519";
const sshTarget = `${user}@${host}`;
const sshOptions = ["-i", sshKey, "-o", "IdentitiesOnly=yes"];

const run = (command, args, options = {}) => {
  console.log(`$ ${[command, ...args].join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("npm", ["run", "build:production"]);
run("rsync", [
  "-az",
  "--delete",
  "-e",
  `ssh ${sshOptions.join(" ")}`,
  "dist/",
  `${sshTarget}:${appDir}/`,
]);
run("ssh", [
  ...sshOptions,
  sshTarget,
  `chown -R www-data:www-data ${appDir} && systemctl restart ${serviceName} && systemctl is-active ${serviceName}`,
]);
run("curl", ["-fsS", "https://sborkai.ru/healthz"]);

console.log("Deploy to Beget VPS completed.");
