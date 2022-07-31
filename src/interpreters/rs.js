import {spawnSync} from "node:child_process";

const types = {
  ok: {
    source: "stdout",
    from: 0,
  },
  err: {
    source: "stderr",
    from: 7,
  },
};

const format = (result, type) => {
  const {source, from} = types[type];
  return `(${type}) ${result[source].toString().split("\n").at(0).slice(from)}`;
};

export default input => {
  const command = `${process.env.HOME}/.cargo/bin/runner`;
  const result = spawnSync(command, ["-e", input]);
  return format(result, result.stderr.toString().length === 0 ? "ok" : "err");
};
