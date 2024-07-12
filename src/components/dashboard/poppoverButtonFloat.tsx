interface Props {
  onPopper: boolean;
}

export default function PoppoverButtonFloat({ onPopper }: Props) {
  return (
    <>
      <div
        className={`${
          !onPopper && "hidden"
        } fixed inset-0 bg-black bg-opacity-10 z-auto`}
      ></div>
      <div
        className={`${
          !onPopper && "hidden"
        } md:hidden fixed bottom-20 right-14 mb-2 z-auto flex flex-col gap-6 ps-2 pe-10 py-6 items-start bg-white shadow-lg rounded-lg`}
      >
        <span>Abastecimento</span>
        <span>Abastecimento</span>
        <span>Abastecimento</span>
        <span>Abastecimento</span>
      </div>
    </>
  );
}
