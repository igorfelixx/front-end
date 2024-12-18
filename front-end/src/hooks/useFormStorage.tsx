import { useState, useEffect } from "react";

const useFormStorage = () => {
  const [formData, setFormData] = useState<{ name: string; maxCalls: number }>({
    name: "",
    maxCalls: 1,
  });
  const [token, setToken] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 9); 
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const savedToken = localStorage.getItem("token");

    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData)); 
      } catch (error) {
        console.error("Erro ao recuperar formData do localStorage", error);
      }
    }

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newToken = generateToken();
    setToken(newToken);

    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("token", newToken);
    setMessage("Dados salvos com sucesso!");
  };

  const handleDelete = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("token");
    setMessage("Dados excluídos com sucesso!");
  };

  return {
    formData,
    token,
    message,
    handleInputChange,
    handleSave,
    handleDelete
  };
};

export default useFormStorage;
