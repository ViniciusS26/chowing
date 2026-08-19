import { useState } from "react";
import React from "react";
import './Tasks.css'
type Priority = "baixa" | "media" | "alta";
type Status = "pendente" | "andamento" | "concluida";
 
interface TaskFormData {
  titulo: string;
  descricao: string;
  dataLimite: string;
  prioridade: Priority;
  status: Status;
}
 
interface Task extends TaskFormData {
  id: number;
  code: string;
}
 
interface FormErrors {
  titulo?: string;
  descricao?: string;
  dataLimite?: string;
}
 
interface PriorityMeta {
  value: Priority;
  label: string;
  ring: string;
  text: string;
  dot: string;
}
 
interface StatusMeta {
  value: Status;
  label: string;
}
 
const PRIORITIES: PriorityMeta[] = [
  { value: "baixa", label: "Baixa", ring: "ring-teal-400", text: "text-teal-300", dot: "bg-teal-400" },
  { value: "media", label: "Média", ring: "ring-amber-400", text: "text-amber-300", dot: "bg-amber-400" },
  { value: "alta", label: "Alta", ring: "ring-rose-400", text: "text-rose-300", dot: "bg-rose-400" },
];
 
const STATUSES: StatusMeta[] = [
  { value: "pendente", label: "Pendente" },
  { value: "andamento", label: "Em andamento" },
  { value: "concluida", label: "Concluída" },
];
 
const EMPTY_FORM: TaskFormData = {
  titulo: "",
  descricao: "",
  dataLimite: "",
  prioridade: "media",
  status: "pendente",
};
 
function ticketCode(n: number): string {
  return `TASK-${String(n).padStart(4, "0")}`;
}
 
export default function TaskForm() {
    const [form, setForm] = useState<TaskFormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [tasks, setTasks] = useState<Task[]>([]);
    const [counter, setCounter] = useState<number>(1);
    const [justStamped, setJustStamped] = useState<boolean>(false);
    
    function update<K extends keyof TaskFormData>(field: K, value: TaskFormData[K]) {
        setForm((f) => ({ ...f, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors((e) => ({ ...e, [field]: undefined }));
        }
    }
    
    function validate(): boolean {
        const next: FormErrors = {};
        if (!form.titulo.trim()) next.titulo = "Informe um título.";
        if (!form.descricao.trim()) next.descricao = "Descreva a tarefa.";
        if (!form.dataLimite) next.dataLimite = "Escolha a data limite.";
        setErrors(next);
        return Object.keys(next).length === 0;
    }
    
    function handleSubmit(e:  React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) return;
    
        const newTask: Task = { ...form, code: ticketCode(counter), id: counter };
        setTasks((t) => [newTask, ...t]);
        setCounter((c) => c + 1);
        setForm(EMPTY_FORM);
        setJustStamped(true);
        setTimeout(() => setJustStamped(false), 500);
    }
    
    const priorityMeta = PRIORITIES.find((p) => p.value === form.prioridade)!;
    
    return (
        <div className="min-h-screen w-full text-slate-100 px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-xl">
            {/* Header */}
            <div className="mb-6 flex items-baseline justify-between">
                <div>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-50">Nova tarefa</h1>
                </div>
                <span className="font-mono text-xs text-slate-500">{ticketCode(counter)}</span>
            </div>
    
            {/* Ticket card */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className={`form-task relative rounded-lg border border-slate-700  shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-transform duration-300 ${
                    justStamped ? "scale-[0.99]" : ""
                }`}
            >
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Título */}
                    <div>
                        <label htmlFor="titulo" className="font-mono text-[14px] tracking-widest text-slate-400 uppercase">
                            Título da tarefa
                        </label>
                        <input
                            id="titulo"
                            type="text"
                            value={form.titulo}
                            onChange={(e) => update("titulo", e.target.value)}
                            placeholder="Ex.: Aulas de Inglês"
                            className={`mt-2 w-full rounded-md border bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:ring-2 focus:ring-indigo-400/60 ${
                            errors.titulo ? "border-indigo-500" : "border-indigo-700"
                            }`}
                        />
                        {errors.titulo && <p className="mt-1 text-xs text-rose-400">{errors.titulo}</p>}
                    </div>
        
                    {/* Descrição */}
                    <div>
                        <label htmlFor="descricao" className="font-mono text-[14px] tracking-widest text-slate-400 uppercase">
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            rows={4}
                            value={form.descricao}
                            onChange={(e) => update("descricao", e.target.value)}
                            placeholder="Detalhe o que precisa ser feito..."
                            className={`mt-2 w-full resize-none rounded-md border bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:ring-2 focus:ring-indigo-400/60 ${
                            errors.descricao ? "border-indigo-500" : "border-indigo-700"
                            }`}
                        />
                        {errors.descricao && <p className="mt-1 text-xs text-rose-400">{errors.descricao}</p>}
                    </div>
        
                    {/* Data limite */}
                    <div>
                        <label htmlFor="dataLimite" className="font-mono text-[14px] tracking-widest text-slate-400 uppercase">
                            Data limite
                        </label>
                        <input
                            id="dataLimite"
                            type="date"
                            value={form.dataLimite}
                            onChange={(e) => update("dataLimite", e.target.value)}
                            className={`mt-2 w-full rounded-md border bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition [color-scheme:dark] focus:ring-2 focus:ring-indigo-400/60 ${
                            errors.dataLimite ? "border-indigo-500" : "border-indigo-700"
                            }`}
                        />
                        {errors.dataLimite && <p className="mt-1 text-xs text-rose-400">{errors.dataLimite}</p>}
                    </div>
        
                    {/* Prioridade */}
                    <div>
                        <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase">Prioridade</span>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {PRIORITIES.map((p) => {
                            const active = form.prioridade === p.value;
                            return (
                                <button
                                key={p.value}
                                type="button"
                                onClick={() => update("prioridade", p.value)}
                                className={`flex items-center justify-center gap-2 rounded-md border py-2 text-sm font-medium transition ${
                                    active
                                    ? `border-transparent bg-slate-800 ring-2 ${p.ring} ${p.text} ${
                                        p.value === "alta" ? "-rotate-1" : ""
                                        }`
                                    : "border-indigo-700 text-indigo-400/50 hover:border-indigo-600/50 hover:text-indigo-200/50"
                                }`}
                                >
                                <span className={`h-1.5 w-1.5 rounded-full ${active ? p.dot : "bg-slate-600"}`} />
                                {p.label}
                                </button>
                            );
                            })}
                        </div>
                    </div>
        
                    {/* Status */}
                    <div>
                        <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase">Status</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {STATUSES.map((s) => {
                            const active = form.status === s.value;
                            return (
                                <button
                                key={s.value}
                                type="button"
                                onClick={() => update("status", s.value)}
                                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                                    active
                                    ? "border-amber-400 bg-amber-400/10 text-amber-300"
                                    : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                                }`}
                                >
                                {s.label}
                                </button>
                            );
                            })}
                        </div>
                    </div>
                </div>
        
                {/* Perforation */}
                <div className="relative">
                    <div className="absolute left-0 right-0 top-0 border-t border-dashed border-slate-700" />
                    <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-slate-950" />
                    <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-slate-950" />
                </div>
        
                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 sm:px-8">
                    <p className="font-mono text-[11px] text-slate-500">
                        Prioridade atual:{" "}
                        <span className={priorityMeta.text}>{priorityMeta.label.toLowerCase()}</span>
                    </p>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-sky-500/50 active:scale-[0.98]"
                        >
                        Cadastrar tarefa
                    </button>
                </div>
            </form>
    
            {/* Lista de tarefas cadastradas */}
            {tasks.length > 0 && (
                <div className="mt-10">
                    <p className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-3">
                    Tarefas registradas ({tasks.length})
                    </p>
                    <div className="space-y-3">
                        {tasks.map((t) => {
                            const pMeta = PRIORITIES.find((p) => p.value === t.prioridade)!;
                            const sLabel = STATUSES.find((s) => s.value === t.status)?.label;
                            return (
                                <div
                                    key={t.id}
                                    className="rounded-md border border-slate-800 bg-slate-900/40 px-4 py-3 flex items-start justify-between gap-4"
                                >
                                    <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] text-slate-500">{t.code}</span>
                                        <span className={`h-1.5 w-1.5 rounded-full ${pMeta.dot}`} />
                                        <span className={`text-[11px] ${pMeta.text}`}>{pMeta.label}</span>
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-100 truncate">{t.titulo}</p>
                                    <p className="text-xs text-slate-500 truncate">{t.descricao}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                    <p className="text-xs text-slate-400">{t.dataLimite}</p>
                                    <p className="mt-1 text-[11px] text-slate-500">{sLabel}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
        </div>
  );
}