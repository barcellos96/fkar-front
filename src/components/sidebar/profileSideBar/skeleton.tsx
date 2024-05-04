// Componente de esqueleto temporário para o perfil
export default function ProfileSideBarSkeleton() {
  return (
    <div className="grid items-center gap-2 grid-cols-profileSideBar animate-pulse">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300">
        <svg
          className="w-max h-5 text-zinc-200 dark:text-zinc-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col truncate">
        <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-36"></div>
      </div>
      <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
    </div>
  );
}
