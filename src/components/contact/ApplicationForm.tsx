import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { applicationSchema, type ApplicationFormValues } from "@/lib/validation";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";
import { useContent } from "@/store/ContentContext";

const FORM_ENDPOINT = "https://formspree.io/f/mppzzyge";

const sourceOptions = [
  "Word of Mouth / Family",
  "Social Media",
  "School Visit",
  "Radio",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationForm({ presetCourse }: { presetCourse?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const { programs } = useContent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: "",
      course: presetCourse ?? "",
      source: "",
      previousSchool: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-emerald-600/5 p-10 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-600" />
        <h3 className="font-display text-lg font-bold text-navy-900">
          Thank you! Your application/inquiry has been submitted.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-navy-700/75">
          We will contact you using the details you provided.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            hasError={!!errors.name}
            {...register("name")}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="+232..."
            hasError={!!errors.phone}
            {...register("phone")}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            hasError={!!errors.email}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" {...register("gender")}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="course">Program of Interest *</Label>
          <Select id="course" hasError={!!errors.course} {...register("course")}>
            <option value="" disabled>
              -- Select a Program --
            </option>
            {programs.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
          </Select>
          <FieldError>{errors.course?.message}</FieldError>
        </div>
        <div>
          <Label htmlFor="source">How did you hear about us?</Label>
          <Select id="source" {...register("source")}>
            <option value="">Select</option>
            {sourceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="previousSchool">Previous School / Qualification</Label>
        <Input
          id="previousSchool"
          placeholder="School or highest qualification"
          {...register("previousSchool")}
        />
      </div>

      <div>
        <Label htmlFor="address">Address / Community</Label>
        <Input id="address" placeholder="Town / community" {...register("address")} />
      </div>

      <div>
        <Label htmlFor="message">Message / Questions *</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Tell us anything the admissions team should know..."
          hasError={!!errors.message}
          {...register("message")}
        />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          Something went wrong sending your inquiry. Please try again, or contact the college
          directly by phone or email.
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Application / Inquiry →"
        )}
      </Button>
    </form>
  );
}
