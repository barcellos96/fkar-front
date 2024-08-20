"use client";

import { UserContext } from "@/providers/user";
import { StepForward } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const TutorialWebHome: React.FC = () => {
  const { user, UpdateUser } = useContext(UserContext);

  const [steps, setSteps] = useState<Step[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal
  const [startTour, setStartTour] = useState(false); // Estado para iniciar o tour
  const [showRestartButton, setShowRestartButton] = useState(
    user?.tour !== "starting"
  ); // Estado para o botão de reiniciar o tour

  useEffect(() => {
    setIsClient(true); // Apenas no cliente
    !startTour && setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setSteps([
        {
          target: "#profile-header",
          content:
            "Este é o seu perfil. Aqui, você pode acessar as configurações do seu usuário, visualizar informações detalhadas da sua conta, e fazer logout com facilidade. Manter seu perfil atualizado garante uma experiência mais personalizada.",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#content-select-car",
          content:
            "Nesta seção, você pode visualizar todos os carros cadastrados na sua conta. Use essa área para selecionar um veículo específico, verificar seu histórico de registros e atualizá-lo conforme necessário. Garantir que suas informações estão sempre precisas é essencial para manter o controle dos seus veículos.",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#nav-side",
          content:
            "Esta é a barra de navegação principal do sistema. Através dela, você acessa todas as funcionalidades do sistema de maneira rápida e intuitiva. Explore os diferentes menus para descobrir tudo o que você pode fazer.",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#btn-add",
          content:
            "Sempre que precisar adicionar novos itens ao sistema, como abastecimentos, lembretes, registros em geral ou qualquer outra informação, clique neste botão. Ele facilita a entrada de novos dados e mantém sua conta sempre atualizada com as informações mais recentes.",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#avatar-side",
          content:
            "Aqui você vê seu avatar. Clicando nele, você pode personalizar sua imagem de perfil para refletir sua identidade. Um avatar personalizado ajuda a criar uma conexão visual mais forte com a plataforma.",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#logout-side",
          content:
            "Este botão permite que você saia da sua conta com segurança. Use-o sempre que terminar de usar o sistema para garantir que suas informações pessoais estejam protegidas. O logout é uma prática importante para manter a segurança dos seus dados.",
          disableBeacon: true, // Não exibir o beacon
        },
      ]);
    }
  }, [isClient]);

  const handleStartTutorial = () => {
    setIsModalOpen(false); // Fechar o modal
    setStartTour(true); // Iniciar o tour
  };

  const handleSeeLater = async () => {
    setIsModalOpen(false); // Fechar o modal
    setShowRestartButton(true); // Exibir o botão de reiniciar
    await UpdateUser({ tour: "seeLater" });
  };

  const handleTourCallback = async (data: CallBackProps) => {
    const { status, action } = data;
    console.log("status", status);

    if (status === STATUS.SKIPPED) {
      // O tour foi pulado pelo usuário
      setStartTour(false); // Parar o tour
      setShowRestartButton(true); // Exibir o botão de reiniciar
      await UpdateUser({ tour: "skipped" });
    } else if (status === STATUS.FINISHED) {
      // O tour foi concluído
      setStartTour(false); // Parar o tour
      setShowRestartButton(true);
      await UpdateUser({ tour: "finished" });
    }
  };

  const handleRestartTour = () => {
    setStartTour(true); // Reiniciar o tour
    setShowRestartButton(false); // Ocultar o botão de reiniciar
  };

  return (
    <div className="hidden md:flex md:absolute ">
      {user?.tour === "starting" && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Bem-vindo ao Tutorial!
            </h2>
            <p className="text-gray-600 mb-6">
              Estamos empolgados para guiá-lo através de um tour interativo que
              ajudará você a se familiarizar com as principais funcionalidades
              do nosso sistema. Este tutorial é uma ótima maneira de começar a
              aproveitar todas as ferramentas e recursos que oferecemos.
            </p>
            <p className="text-gray-600 mb-6">
              Clique no botão abaixo para iniciar o tour. Se você precisar de
              mais informações ou tiver dúvidas durante o tutorial, não hesite
              em nos procurar.
            </p>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              onClick={handleStartTutorial}
            >
              Iniciar Tour
            </button>
            <button
              className=" text-zinc-400 px-6 py-3 hover:text-zinc-300 transition duration-300"
              onClick={handleSeeLater}
            >
              Lembrar Depois
            </button>
          </div>
        </div>
      )}
      {isClient && startTour && (
        <Joyride
          steps={steps}
          run={startTour} // Garante que o tour inicie
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          spotlightPadding={5}
          hideCloseButton
          disableOverlayClose
          disableScrolling
          disableCloseOnEsc
          styles={{
            beacon: {
              cursor: "pointer",
            },
            beaconOuter: {
              backgroundColor: "green",
              border: "green",
              position: "absolute",
              left: 100,
              top: -20,
            },
            beaconInner: {
              backgroundColor: "green",
              position: "absolute",
              left: 118,
              top: -2,
            },
            options: {
              zIndex: 10000,
              // Certifique-se de que o beacon não está oculto
            },
          }}
          callback={handleTourCallback} // Adicione o callback
        />
      )}

      {showRestartButton && (
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-2 py-2 hover:px-3 hover:py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 z-50"
          onClick={handleRestartTour}
        >
          <section className="flex items-center gap-2 group">
            <StepForward size={18} />
            <span className="hidden group-hover:flex">Reiniciar Tour</span>
          </section>
        </button>
      )}
    </div>
  );
};

export default TutorialWebHome;
