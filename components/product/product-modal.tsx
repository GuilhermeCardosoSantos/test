"use client"

// hooks
import { useEffect, useRef } from "react"
// ui
import Button from "@/components/UI/button"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ProductModal({ open, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  // effect
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, textarea, select"
        )

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (!first || !last) return

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKey)

      setTimeout(() => {
        modalRef.current?.focus()
      }, 0)
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [open, onClose])

  // render
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-(--card) text-foreground rounded-lg p-5 w-full max-w-md shadow-xl outline-none transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3">
          {children}
        </div>

        <Button
          onClick={onClose}
          className="mt-5 w-full cursor-pointer bg-(--border) text-foreground rounded py-2 hover:opacity-80 transition"
        >
          Fechar
        </Button>
      </div>
    </div>
  )
}