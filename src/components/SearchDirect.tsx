import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Direct } from "@/models/Direct.model";
import { getDirects } from "@/services/directService";
import { useToast } from "@/hooks/use-toast";

export function SearchDirect() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Direct | null>(null);
  const [data, setData] = useState<Direct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDirects("Warszawa");
  }, []);

  const fetchDirects = async (query: string, country: string = "pl") => {
    setLoading(true);
    try {
      const data = await getDirects(query, country);
      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (err: any) {
      toast({
        title: "error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? value.name : "Select place..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search place..." onValueChange={(value) => fetchDirects(value)} />
          <CommandList>
            <CommandEmpty>No place found.</CommandEmpty>
            <CommandGroup>
              {data.map((el) => (
                <CommandItem
                  key={el.name}
                  value={el.name}
                  onSelect={() => {
                    setValue(el === value ? null : el);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === el ? "opacity-100" : "opacity-0")} />
                  <img className="me-2" src={`https://flagsapi.com/${el.country}/flat/32.png`} />
                  <div>
                    <p>{el.name}</p>
                    <small>
                      {el.country} {el.state}
                    </small>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export interface placeCords {
  lat: number;
  lon: number;
}
