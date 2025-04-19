import crypto from "crypto";

class HashService {
  static hashRequest(request) {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(request))
      .digest("hex");
  }
}

export { HashService };
