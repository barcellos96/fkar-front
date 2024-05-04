export default function PlanoWidget() {
  return (
    <div className="flex flex-col rounded-lg bg-green-100 max-w-60 px-4 py-3 gap-1 shadow-md">
      <span className="text-sm font-bold text-green-700">SEU PLANO</span>
      <span className="text-sm font-normal text-green-700">
        Você está no plano FREE. Deseja fazer upgrade?
      </span>
      <button
        type="button"
        className="rounded bg-green-700 text-white text-sm py-1 mt-2 hover:bg-green-800"
      >
        FAZER UPGRADE
      </button>
    </div>
  );
}
