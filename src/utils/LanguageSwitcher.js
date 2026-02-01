import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <button onClick={toggleLang} className="btn btn-outline-secondary">
            {i18n.language === "en" ? "AR" : "EN"}
        </button>
    );
}

export default LanguageSwitcher;
