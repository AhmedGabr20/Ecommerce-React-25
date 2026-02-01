import { ErrorCodes } from "../constants/errorCodes";

export function getApiErrorCode(err) {
    // backend ApiResponse: { status, message, data }
    return err?.response?.data?.message || null;
}

export function getToastMessage(t, err) {
    const code = getApiErrorCode(err);

    // لو backend بيرجع code زي PAYMENT_ALREADY_EXISTS
    if (code) {
        return t(`errors.${code}`, { defaultValue: t("errors.DEFAULT", { defaultValue: code }) });
    }

    // fallback عام
    return t("errors.DEFAULT", { defaultValue: "Something went wrong" });
}
