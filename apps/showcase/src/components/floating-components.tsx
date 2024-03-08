import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
  Spinner,
  Switch,
  Tab,
  Tabs,
  Tooltip,
} from '@nextui-org/react'
import { MoonFilledIcon, SunFilledIcon } from '@nextui-org/shared-icons'

export const FloatingComponents = () => {
  return (
    <div className="relative z-20 hidden w-1/2 flex-col lg:flex">
      <>
        <Switch
          classNames={{
            startContent: 'text-white',
            wrapper: 'shadow-sm',
          }}
          endContent={<MoonFilledIcon />}
          size="lg"
          startContent={<SunFilledIcon />}
        />

        <Input
          className="w-[200px]"
          color="secondary"
          defaultValue="NextUI"
          label="Input"
          labelPlacement="outside"
          onClear={() => {}}
          variant="bordered"
        />

        <Card className="h-[120px] max-w-fit" isFooterBlurred>
          <Image
            alt="Professional camera"
            className="h-[100%] -translate-y-12 object-cover"
            height={120}
            src="https://nextui.org/_next/image?url=%2Fimages%2Fcard-example-6.webp&w=256&q=75"
            width={120}
          />
          <CardFooter className="bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-xl border-1 border-white/20 py-2 shadow-lg before:rounded-xl before:bg-black/10">
            <p className="text-xs font-semibold text-white/80">Camera</p>
            <p className="text-xs font-semibold text-white/80">$525</p>
          </CardFooter>
        </Card>

        <Tabs
          aria-label="Floating tabs example"
          className=""
          classNames={{
            base: '',
            tabList: 'max-w-[200px] shadow-sm',
          }}
          radius="full"
          size="sm"
        >
          <Tab key="notes" title="Notes" />
          <Tab key="tasks" title="Tasks" />
          <Tab key="files" title="Files" />
        </Tabs>

        <Card className="max-w-fit border-none" shadow="lg">
          <CardBody>tailwind-plugin-palette</CardBody>
        </Card>

        <div>
          <Pagination
            classNames={{
              base: 'rounded-xl',
            }}
            initialPage={6}
            isCompact
            showControls
            showShadow
            total={10}
          />
        </div>

        <Tooltip
          color="secondary"
          content="Developers love Next.js"
          placement="top"
          showArrow
          style={{
            zIndex: 39,
          }}
        >
          <Button className="max-w-fit" color="secondary" size="sm" variant="flat">
            Tooltip
          </Button>
        </Tooltip>

        <Card className="max-w-fit border-none" shadow="lg">
          <CardBody>
            <Spinner color="secondary" size="lg" />
          </CardBody>
        </Card>

        <Card className="max-w-fit" isFooterBlurred>
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src="/images/hero-card.webp"
            width={200}
          />
          <CardFooter className="bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button className="bg-black/20 text-tiny text-white" color="default" radius="lg" size="sm" variant="flat">
              Notify me
            </Button>
          </CardFooter>
        </Card>
      </>
    </div>
  )
}
