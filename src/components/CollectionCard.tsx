import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  // Extract savings from description
  const savingsMatch = collection.description?.match(/Save up to \$(\d+)/);
  const savings = savingsMatch ? savingsMatch[1] : null;

  return (
    <Card className="group bg-card border-2 overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => onViewProducts(collection.id)}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          
          {savings && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
              Save ${savings}+
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-foreground font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onViewProducts(collection.id);
            }}
          >
            View Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}