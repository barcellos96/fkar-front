"use client";

import { ComponentsContext } from "@/providers/components";
import { UserContext } from "@/providers/user";
import { StepForward } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import Joyride, { ACTIONS, CallBackProps, STATUS, Step } from "react-joyride";

const TutorialMobile: React.FC = () => {
  const { user, UpdateUser } = useContext(UserContext);
  const { sidebar, setSidebar } = useContext(ComponentsContext);

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
          target: "#profile",
          content:
            "Aqui você acessa seu perfil, faz logout e pode alterar sua imagem de perfil",
          disableBeacon: true, // Não exibir o beacon
        },
        {
          target: "#menu-mobile",
          content:
            "Esta é o menu de navegação lateral. Você pode ir até as outras funcionalidades",
          disableBeacon: true, // Não exibir o beacon
        },

        // Adicione mais steps aqui, se necessário
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
    const { status, index, step } = data;
    console.log("index", index);
    console.log("step", step.target);

    if (step.target === "#profile") console.log("estou vendo profile");

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
    setSidebar(false);
    setShowRestartButton(false); // Ocultar o botão de reiniciar
    handleTourCallback;
  };

  return (
    <div className="absolute md:hidden">
      {user?.tour === "starting" && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
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
          spotlightPadding={2}
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
          callback={handleTourCallback}
        />
      )}

      {showRestartButton && (
        <button
          className={`${
            !sidebar && "hidden"
          } fixed bottom-4 right-4 bg-blue-600 text-white px-2 py-2 hover:px-3 hover:py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 z-50`}
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

export default TutorialMobile;
