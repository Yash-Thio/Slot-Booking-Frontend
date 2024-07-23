interface HeaderProps {
  label: string;
}

export default function Header( {label}:HeaderProps) {
  return (
    <div className="flex flex-col pb-4">
        <h1 className="text-4xl font-bold text-left">{label}</h1>
        <hr className="font-bold w-screen"></hr>
    </div>
  )
}

