import { defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);