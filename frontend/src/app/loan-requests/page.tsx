import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { Tool } from "../../lib/loan-types";
import type { LoanRequest } from "../../lib/loan-types";

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];

  // TODO FRONT-A: leer searchParams y consultar las solicitudes con apiFetch.
  // TODO FRONT-A: agregar el formulario GET de filtro usando tools y la opción All tools.
  // TODO FRONT-A: mostrar las solicitudes y sus enlaces al comprobante correspondiente.
  const { toolId } = await searchParams;
  const path = toolId ? `/loan-requests?toolId=${encodeURIComponent(toolId)}` : "/loan-requests";
  const response = await apiFetch(path);
  const requests: LoanRequest[] = response.ok ? await response.json() : [];

  void searchParams;
  void tools;

  return (
  
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>

      <form action="/loan-requests">
        <select name="toolId" defaultValue={toolId ?? ""}>
          <option value="">All tools</option>
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>{tool.name}</option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>

      {requests.map((request) => (
        <div key={request.id}>
          <p>{request.id} - {request.purpose} - {request.days} days - {request.tool.name}</p>
          <Link className="button" href={`/loan-requests/${request.id}`}>View receipt</Link>
        </div>
      ))}
    </main>



  );
}

