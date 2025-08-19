import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const DetailsSidebar = ({
  tab,
}: {
  tab: "personal" | "professional" | "hobbies";
}) => {
  const p = useTranslations("about.personal");
  return (
    <div className=" py-4">
      {tab === "personal" && (
        <div>
          <div className=" flex items-center gap-2 border-b px-2 pb-2">
            <ChevronDown />
            <p>{p("title")}</p>
          </div>
          <div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className=" flex items-center gap-4 px-4 py-2">
                  <ChevronRight size={16} />
                  <Folder className=" text-primary" size={18} />
                  <p>{p("bio.title")}</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" pr-8 py-2">
                  <DropdownMenuItem>
                    <File size={18} />
                    <p>{p("bio.title")}</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
      {tab === "professional" && <div>professional</div>}
      {tab === "hobbies" && <div>hobbies</div>}
    </div>
  );
};

export default DetailsSidebar;
