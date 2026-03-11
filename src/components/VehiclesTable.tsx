import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

interface Vehicle {
  id: string;
  vin: string;
  model: string | null;
  year: number | null;
  nickname: string | null;
  created_at: string;
}

const VehiclesTable = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setVehicles(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const years = [...new Set(vehicles.map((v) => v.year).filter(Boolean))].sort((a, b) => (b ?? 0) - (a ?? 0));

  const filtered = vehicles.filter((v) => {
    const matchesSearch =
      !search ||
      v.vin.toLowerCase().includes(search.toLowerCase()) ||
      v.model?.toLowerCase().includes(search.toLowerCase()) ||
      v.nickname?.toLowerCase().includes(search.toLowerCase());
    const matchesYear = yearFilter === "all" || v.year?.toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Mis Vehículos</h2>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar VIN, modelo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        {years.length > 0 && (
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apodo</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Año</TableHead>
              <TableHead className="hidden sm:table-cell">VIN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Cargando...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No hay vehículos registrados</TableCell></TableRow>
            ) : (
              filtered.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.nickname || "—"}</TableCell>
                  <TableCell>{v.model || "—"}</TableCell>
                  <TableCell>{v.year || "—"}</TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs">{v.vin}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehiclesTable;
