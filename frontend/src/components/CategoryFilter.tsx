import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useCategories } from '../hooks/usePlants';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  const { data: categories = []} = useCategories();

  return (
    <div className="flex items-center gap-2">
      <Filter className="text-muted-foreground h-4 w-4" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-card border-border/50 focus:border-botanical">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border/50 w-auto">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.name} value={category.name} >
              {category.name} ({category.count})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};