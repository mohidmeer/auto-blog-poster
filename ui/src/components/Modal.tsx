import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "../components/ui/dialog"
const Modal = ({ children, content, title }: { children: any, content: any, title: string }) => {
    return (
        <Dialog>
            
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogClose id={'close-dialog'}/>
                </DialogHeader>

                {/* Form will be here  */}
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
