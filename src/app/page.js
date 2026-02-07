import Homepage from "@/components/Homepage";
import FloatingChatButton from "@/components/Chatbot/FloatingChatButton";

export default function Home() {
  console.log("Rendering Home Page");
  return (
    <main>
      <Homepage />
      <FloatingChatButton />
    </main>
  );
}
