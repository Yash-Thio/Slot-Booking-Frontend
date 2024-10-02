interface Props {
    children: React.ReactNode
    name: string
    to: string | undefined
  }
  
  const NavigationLink = ({ children, name, to }: Props) => {
    return (
      <div className="p-1">
      <a
        href={to}
        className="flex rounded cursor-pointer stroke-[0.75] stroke-neutral-400 text-neutral-400 place-items-center gap-3 overflow-hidden"
      >
        {children}
        <p className="text-inherit whitespace-nowrap tracking-wide overflow-hidden">
          {name}
        </p>
      </a>
      </div>
    )
  }
  
  export default NavigationLink