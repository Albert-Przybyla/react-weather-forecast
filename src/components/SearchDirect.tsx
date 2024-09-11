import { Check, LocateFixed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useState, useEffect, useCallback } from "react";
import { Direct } from "@/models/Direct.model";
import { getDirects } from "@/services/directService";
import { useToast } from "@/hooks/use-toast";
import debounce from "lodash.debounce";
import Loader from "./Loader";

interface Props {
  onSelect: (direct: Direct) => void;
}

export function SearchDirect({ onSelect }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Direct | null>(null);
  const [data, setData] = useState<Direct[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingGeo, setLoadingGeo] = useState(false);

  useEffect(() => {
    fetchDirects("Warszawa");
  }, []);

  const fetchDirects = async (query: string, country: string = "pl") => {
    setLoading(true);
    try {
      const data = await getDirects(query, country);
      if (data) {
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

  const debouncedFetchDirects = useCallback(
    debounce((value: string) => fetchDirects(value), 500),
    []
  );

  const getLocation = () => {
    setLoadingGeo(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSelect({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLoadingGeo(false);
        },
        (err) => {
          console.error(err);
          setLoadingGeo(false);
        }
      );
    } else {
      console.error("Geolokalizacja nie jest wspierana w tej przeglądarce.");
      setLoadingGeo(false);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? "..." : "Select place..."}

            <LocateFixed
              className="shrink-0 opacity-50"
              onClick={(e) => {
                getLocation();
                e.stopPropagation();
              }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search place..."
              onValueChange={(value) => {
                setLoading(true);
                debouncedFetchDirects(value);
              }}
            />
            {loading && (
              <CommandList>
                <CommandItem>
                  <Skeleton className="h-[40apx] w-full rounded-md" />
                </CommandItem>
                <CommandItem>
                  <Skeleton className="h-[40px] w-full rounded-md" />
                </CommandItem>
              </CommandList>
            )}
            {!loading && (
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
                        onSelect(el);
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
            )}
          </Command>
        </PopoverContent>
      </Popover>
      <Loader show={loadingGeo}></Loader>
    </>
  );
}

export interface placeCords {
  lat: number;
  lon: number;
}
