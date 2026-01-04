export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-2">
      <img 
        src="/logo.jpg" 
        alt="Attraction Tickets"
        className="h-10 w-auto object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-xl font-bold text-primary hidden sm:block">
        TicketHub
      </span>
    </a>
  )
}